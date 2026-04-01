<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class CompanyController extends Controller
{
    public function contact()
    {
        return view('company.contact');
    }

    public function privacy()
    {
        return view('company.privacy');
    }

    public function terms()
    {
        return view('company.terms');
    }

    public function security()
    {
        return view('company.security');
    }

    public function refund()
    {
        return view('company.refund');
    }

    public function sendContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        try {
            Mail::to('oneformindapp@gmail.com')->send(new ContactMail($validated));
            
            return back()->with('success', __('contact_success_desc'));
        } catch (\Exception $e) {
            // Log error or handle it
            return back()->with('error', 'Ops! Something went wrong. Please try again later.');
        }
    }
}
