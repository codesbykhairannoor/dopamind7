<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexChainTimelineRequest;
use App\Http\Requests\IndexChainLinkRequest;
use App\Http\Requests\IndexChainSearchRequest;
use App\Http\Requests\IndexChainSuggestionRequest;
use App\Http\Requests\StoreChainQuickTargetRequest;
use App\Http\Requests\StoreChainLinkRequest;
use App\Models\ChainLink;
use App\Services\ChainSyncService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ChainSyncController extends Controller
{
    public function __construct(private ChainSyncService $chainSyncService)
    {
    }

    public function index(IndexChainLinkRequest $request): JsonResponse
    {
        $links = $this->chainSyncService->listLinks(Auth::id(), $request->validated());

        return response()->json([
            "message" => "Chain links fetched successfully.",
            "data" => $links,
        ]);
    }

    public function store(StoreChainLinkRequest $request): JsonResponse
    {
        $link = $this->chainSyncService->createLink(Auth::id(), $request->validated());

        return response()->json([
            "message" => "Chain link saved successfully.",
            "data" => $link,
        ], 201);
    }

    public function destroy(ChainLink $chainLink): JsonResponse
    {
        $this->chainSyncService->removeLink(Auth::id(), $chainLink);

        return response()->json([
            "message" => "Chain link removed successfully.",
        ]);
    }

    public function quickTarget(StoreChainQuickTargetRequest $request): JsonResponse
    {
        $data = $this->chainSyncService->quickCreateTarget(Auth::id(), $request->validated());

        return response()->json([
            "message" => "Quick target created successfully.",
            "data" => $data,
        ], 201);
    }

    public function timeline(IndexChainTimelineRequest $request): JsonResponse
    {
        $payload = $request->validated();
        $timeline = $this->chainSyncService->getTimelineForEntity(
            Auth::id(),
            $payload["entity_type"],
            (int) $payload["entity_id"],
            (int) ($payload["limit"] ?? 30),
        );

        return response()->json([
            "message" => "ChainSync timeline fetched successfully.",
            "data" => $timeline,
        ]);
    }

    public function search(IndexChainSearchRequest $request): JsonResponse
    {
        $payload = $request->validated();
        $items = $this->chainSyncService->searchOptions(
            Auth::id(),
            (string) ($payload["q"] ?? ""),
            $payload["types"] ?? [],
        );

        return response()->json([
            "message" => "ChainSync search options fetched.",
            "data" => $items,
        ]);
    }

    public function suggestions(IndexChainSuggestionRequest $request): JsonResponse
    {
        $payload = $request->validated();
        $items = $this->chainSyncService->suggestConnections(
            Auth::id(),
            $payload["source_type"],
            (int) $payload["source_id"],
        );

        return response()->json([
            "message" => "ChainSync suggestions fetched.",
            "data" => $items,
        ]);
    }
}
