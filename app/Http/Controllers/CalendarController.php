<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use App\Http\Requests\StoreCalendarEventRequest;
use App\Http\Requests\UpdateCalendarEventRequest;
use App\Http\Requests\CalendarIndexRequest;
use App\Http\Resources\CalendarEventResource;
use App\Services\CalendarService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function __construct(private CalendarService $calendarService)
    {
        // Service injected secara otomatis
    }

    public function index(CalendarIndexRequest $request)
    {
        $user = Auth::user();
        $timezone = $user->timezone ?? 'Asia/Jakarta';
        $month = $request->getValidMonth($timezone);

        // Oper pekerjaan berat (Heavy Lifting) ke Service
        $data = $this->calendarService->getMonthlyDashboardData($user->id, $month, $timezone);

        return Inertia::render('Calendar/Index', [
            'currentMonth' => $data['currentMonth'],
            'data' => [
                'events'   => CalendarEventResource::collection($data['events'])->resolve(),
                'journals' => $data['journals'],
                'finances' => $data['finances'],
                'planners' => $data['planners'],
                'habits'   => $data['habits'], 
            ]
        ]);
    }

    // --- CRUD KHUSUS CALENDAR EVENT (SKINNY CONTROLLER) ---

    public function storeEvent(StoreCalendarEventRequest $request)
    {
        Auth::user()->calendarEvents()->create($request->validated());
        return back();
    }

    public function updateEvent(UpdateCalendarEventRequest $request, $id)
    {
        $event = CalendarEvent::ofUser(Auth::id())->findOrFail($id);
        $event->update($request->validated());
        return back();
    }

    public function destroyEvent($id)
    {
        CalendarEvent::ofUser(Auth::id())->findOrFail($id)->delete();
        return back();
    }
}