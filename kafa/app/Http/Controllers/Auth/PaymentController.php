<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return Inertia::render('Admin/Payments/Index', ['payments' => $payments]);
    }

    public function create()
    {
        return Inertia::render('Admin/Payments/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'user_id' => 'required|exists:users,id',
        ]);

        Payment::create($request->all());

        return redirect()->route('admin.payments.index')->with('success', 'Payment created successfully.');
    }

    public function edit(Payment $payment)
    {
        return Inertia::render('Admin/Payments/Edit', ['payment' => $payment]);
    }

    public function update(Request $request, Payment $payment)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'user_id' => 'required|exists:users,id',
        ]);

        $payment->update($request->all());

        return redirect()->route('admin.payments.index')->with('success', 'Payment updated successfully.');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('admin.payments.index')->with('success', 'Payment deleted successfully.');
    }
}
