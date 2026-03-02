<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Http\Requests\StoreJournalRequest;
use App\Http\Requests\UploadJournalImageRequest;
use App\Http\Resources\JournalResource;
use App\Services\JournalService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function __construct(private JournalService $journalService) {}

    public function index()
    {
        $user = Auth::user();
        $journals = Journal::ofUser($user->id)->latest()->get();
        $synergy = $this->journalService->getSynergyStats($user->id, $user->timezone ?? 'Asia/Jakarta');

        return Inertia::render('Journal/Index', array_merge([
            'journals' => JournalResource::collection($journals)->resolve(),
        ], $synergy));
    }

    public function write($id = null)
    {
        $user = Auth::user();
        $journal = $id ? Journal::ofUser($user->id)->findOrFail($id) : null;
        $synergy = $this->journalService->getSynergyStats($user->id, $user->timezone ?? 'Asia/Jakarta');

        return Inertia::render('Journal/Write', array_merge([
            'journal' => $journal ? (new JournalResource($journal))->resolve() : null,
            'date'    => $journal ? $journal->date : $synergy['todayDate'],
        ], $synergy));
    }

    public function store(StoreJournalRequest $request)
    {
        $user = Auth::user();
        $journal = Journal::create(array_merge($request->validated(), [
            'user_id' => $user->id,
            'date'    => now()->timezone($user->timezone ?? 'Asia/Jakarta')->format('Y-m-d'),
        ]));

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'message' => 'Journal created',
                'data' => (new JournalResource($journal))->resolve()
            ]);
        }

        return redirect()->route('journal.write', $journal->id);
    }

    public function update(StoreJournalRequest $request, $id)
    {
        $journal = Journal::ofUser(Auth::id())->findOrFail($id);
        $input = $request->validated();

        if ($this->journalService->isEmpty($journal, $input)) {
            $this->journalService->deleteImage($journal->image_path);
            $journal->delete();

            return $request->wantsJson() 
                ? response()->json(['message' => 'Deleted', 'deleted' => true])
                : redirect()->route('journal.index');
        }

        $journal->update($input);

        return $request->wantsJson()
            ? response()->json(['message' => 'Updated', 'data' => (new JournalResource($journal))->resolve()])
            : back();
    }

    public function destroy($id)
    {
        $journal = Journal::ofUser(Auth::id())->findOrFail($id);
        $this->journalService->deleteImage($journal->image_path);
        $journal->delete();

        return redirect()->route('journal.index');
    }

    public function uploadImage(UploadJournalImageRequest $request)
    {
        $user = Auth::user();
        $disk = config('filesystems.default');

        $journal = $request->id 
            ? Journal::ofUser($user->id)->findOrFail($request->id) 
            : Journal::create([
                'user_id' => $user->id, 
                'date' => now()->timezone($user->timezone ?? 'Asia/Jakarta')->format('Y-m-d')
            ]);

        $this->journalService->deleteImage($journal->image_path);
        
        $path = $request->file('image')->store('journals', $disk);
        $journal->update(['image_path' => $path]);

        if ($request->wantsJson() || $request->ajax()) {
            // 🔥 FIX: Ambil URL langsung dari Resource, jadi tidak akan ada logika URL yang berbeda
            $resourceData = (new JournalResource($journal))->resolve();
            return response()->json([
                'success' => true,
                'url' => $resourceData['image_url'],
                'journal_id' => $journal->id
            ]);
        }

        return $request->id ? back() : redirect()->route('journal.write', $journal->id);
    }

    public function deleteImage($id)
    {
        $journal = Journal::ofUser(Auth::id())->findOrFail($id);
        $this->journalService->deleteImage($journal->image_path);
        $journal->update(['image_path' => null]);

        return request()->wantsJson() 
            ? response()->json(['success' => true]) 
            : back();
    }
}