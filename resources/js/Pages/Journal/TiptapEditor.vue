<script setup>
import { ref, onBeforeUnmount, onMounted } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { Extension, Mark, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import OneForMindIcon from "@/Components/OneForMindIcon.vue";
import { Mic, Type, ChevronDown, Sparkles } from "lucide-vue-next";
import { useGating } from "@/Composables/useGating";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    isExplorer: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "Mulai menulis cerita harimu...",
    },
});

const emit = defineEmits(["update:modelValue"]);

const { canUse } = useGating();

/**
 * NO-COLLISION VERSION - CUSTOM INTERNAL MARKS
 * Implements TextStyle and FontFamily logic internally to avoid
 * importing the @tiptap/extension-* packages which cause 'already declared' errors.
 */

// --- CUSTOM OMTextStyle (Replaces TextStyle) ---
const OMTextStyle = Mark.create({
    name: "textStyle",
    addOptions() {
        return { HTMLAttributes: {} };
    },
    parseHTML() {
        return [{ tag: "span" }];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0,
        ];
    },
    addAttributes() {
        return { style: { default: null } };
    },
    addCommands() {
        return {
            setTextStyle:
                (attributes) =>
                ({ chain }) =>
                    chain().setMark(this.name, attributes).run(),
            removeEmptyTextStyle:
                () =>
                ({ state, commands }) => {
                    const attributes =
                        state.schema.marks.textStyle.getAttributes(state);
                    if (attributes && !attributes.style) {
                        return commands.unsetMark(this.name);
                    }
                    return false;
                },
        };
    },
});

// --- CUSTOM OMFontFamily (Replaces FontFamily) ---
const OMFontFamily = Extension.create({
    name: "fontFamily",
    addOptions() {
        return { types: ["textStyle"] };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontFamily: {
                        default: null,
                        parseHTML: (el) =>
                            el.style.fontFamily?.replace(/['"]+/g, ""),
                        renderHTML: (attr) => {
                            if (!attr.fontFamily) return {};
                            return { style: `font-family: ${attr.fontFamily}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontFamily:
                (fontFamily) =>
                ({ chain }) =>
                    chain().setMark("textStyle", { fontFamily }).run(),
            unsetFontFamily:
                () =>
                ({ chain }) =>
                    chain().setMark("textStyle", { fontFamily: null }).run(),
        };
    },
});

// --- CUSTOM OMFontSize (Replaces FontSize) ---
const OMFontSize = Extension.create({
    name: "fontSize",
    addOptions() {
        return { types: ["textStyle"] };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (el) =>
                            el.style.fontSize.replace(/['"]+/g, ""),
                        renderHTML: (attr) => {
                            if (!attr.fontSize) return {};
                            return { style: `font-size: ${attr.fontSize}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                ({ chain }) =>
                    chain().setMark("textStyle", { fontSize }).run(),
            unsetFontSize:
                () =>
                ({ chain }) =>
                    chain().setMark("textStyle", { fontSize: null }).run(),
        };
    },
});

const editor = useEditor({
    content: props.modelValue || "",
    extensions: [
        StarterKit,
        OMTextStyle,
        OMFontFamily,
        OMFontSize,
        Placeholder.configure({ placeholder: props.placeholder }),
    ],
    immediatelyRender: false,
    editorProps: {
        attributes: {
            class: "prose prose-slate prose-lg md:prose-xl dark:prose-invert max-w-none focus:outline-none min-h-[50vh] text-slate-700 dark:text-slate-300 font-medium leading-relaxed pb-20 transition-colors duration-500",
            autocorrect: "off",
            autocomplete: "off",
            spellcheck: "true",
        },
    },
    onUpdate: ({ editor }) => {
        emit("update:modelValue", editor.getHTML());
    },
});

onBeforeUnmount(() => {
    editor.value?.destroy();
});

// --- Voice to Text Logic ---
const isListening = ref(false);
let recognition = null;

const startVoiceRecognition = () => {
    if (!canUse("planner_recurring")) return;

    if (isListening.value) {
        if (recognition) recognition.stop();
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Browser Anda tidak mendukung Voice to Text.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening.value = true;
    };
    recognition.onend = () => {
        isListening.value = false;
    };
    recognition.onresult = (event) => {
        const transcript =
            event.results[event.results.length - 1][0].transcript;
        if (editor.value) {
            editor.value
                .chain()
                .focus()
                .insertContent(transcript + " ")
                .run();
        }
    };

    recognition.start();
};

const showFontMenu = ref(false);
const showSizeMenu = ref(false);

const fontFamilies = [
    { name: "Modern Sans", value: "Inter, sans-serif" },
    { name: "Elegant Serif", value: "Lora, serif" },
    { name: "Classic Serif", value: "Playfair Display, serif" },
    { name: "Noble Serif", value: "Merriweather, serif" },
    { name: "Design Mono", value: "JetBrains Mono, monospace" },
    { name: "Modern Writing", value: "Outfit, sans-serif" },
];

const fontSizes = [
    { label: "Normal", value: "1.125rem" },
    { label: "Medium", value: "1.25rem" },
    { label: "Large", value: "1.5rem" },
    { label: "Extra", value: "1.875rem" },
];

const setFontFamily = (value) => {
    editor.value.chain().focus().setFontFamily(value).run();
    showFontMenu.value = false;
};

const setFontSize = (value) => {
    editor.value.chain().focus().setFontSize(value).run();
    showSizeMenu.value = false;
};

const isMounted = ref(false);
onMounted(() => {
    isMounted.value = true;
});
</script>

<template>
    <!-- Integrated Toolbar (Sub-header sticky) -->
    <Teleport to="#tiptap-toolbar-target" v-if="isMounted">
        <div
            v-if="editor"
            class="flex flex-wrap items-center gap-1 md:gap-2 justify-center"
        >
        <!-- Bold -->
        <button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{
                'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none':
                    editor.isActive('bold'),
            }"
            class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 group/btn relative"
        >
            <OneForMindIcon name="bold" size="18" stroke-width="3" />
        </button>

        <!-- Italic -->
        <button
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{
                'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none':
                    editor.isActive('italic'),
            }"
            class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 group/btn relative"
        >
            <OneForMindIcon name="italic" size="18" stroke-width="3" />
        </button>

        <div
            class="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2 self-center"
        ></div>

        <!-- Font Family Dropdown -->
        <div class="relative">
            <button
                @click="
                    showFontMenu = !showFontMenu;
                    showSizeMenu = false;
                "
                class="h-10 px-3 rounded-xl flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 font-bold active:scale-95 group/btn"
            >
                <Type class="w-4 h-4" />
                <ChevronDown class="w-3 h-3 opacity-50" />
            </button>
            <div
                v-if="showFontMenu"
                class="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-[100] animate-in fade-in zoom-in-95 duration-200"
            >
                <button
                    v-for="font in fontFamilies"
                    :key="font.value"
                    @click="setFontFamily(font.value)"
                    class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between"
                    :class="{
                        'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400':
                            editor.isActive('textStyle', {
                                fontFamily: font.value,
                            }),
                    }"
                >
                    <span :style="{ fontFamily: font.value }">{{
                        font.name
                    }}</span>
                    <Sparkles
                        v-if="font.value !== 'Inter, sans-serif'"
                        class="w-3 h-3 opacity-50"
                    />
                </button>
            </div>
        </div>

        <!-- Font Size Dropdown -->
        <div class="relative">
            <button
                @click="
                    showSizeMenu = !showSizeMenu;
                    showFontMenu = false;
                "
                class="h-10 px-3 rounded-xl flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 font-bold active:scale-95 group/btn"
            >
                <span class="text-xs">Aa</span>
                <ChevronDown class="w-3 h-3 opacity-50" />
            </button>
            <div
                v-if="showSizeMenu"
                class="absolute top-full mt-2 left-0 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-[100] animate-in fade-in zoom-in-95 duration-200"
            >
                <button
                    v-for="size in fontSizes"
                    :key="size.value"
                    @click="setFontSize(size.value)"
                    class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between"
                    :class="{
                        'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400':
                            editor.isActive('textStyle', {
                                fontSize: size.value,
                            }),
                    }"
                >
                    <span>{{ size.label }}</span>
                    <span class="text-[9px] opacity-40">{{ size.value }}</span>
                </button>
            </div>
        </div>

        <div
            class="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2 self-center"
        ></div>

        <!-- Bullet List -->
        <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{
                'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none':
                    editor.isActive('bulletList'),
            }"
            class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 group/btn relative"
        >
            <OneForMindIcon name="list" size="18" stroke-width="3" />
        </button>

        </div>
    </Teleport>

    <!-- Editor Content -->
    <editor-content :editor="editor" />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;700;900&family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap");

.tiptap p.is-editor-empty:first-child::before {
    color: #cbd5e1;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}
.tiptap h2 {
    font-weight: 900;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: #1e293b;
    font-size: 1.5em;
}
.tiptap b,
.tiptap strong {
    font-weight: 900;
    color: #1e293b;
}
.tiptap:focus {
    outline: none;
}

.dark .tiptap h2 {
    color: #f8fafc;
}
.dark .tiptap b,
.dark .tiptap strong {
    color: #f8fafc;
}
.dark .tiptap p.is-editor-empty:first-child::before {
    color: #475569;
}

/* Font Transition */
.tiptap {
    transition: all 0.3s ease;
}
</style>
