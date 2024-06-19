<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use Inertia\Inertia;
use App\Models\User;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = auth()->user()->role!=='parent'
            ? Payment::with('parent')->get()
            : Payment::where('parent_id', auth()->id())->get();

        return Inertia::render('Payments/Index', ['payments' => $payments]);
    }

    public function create()
    {  $parents = User::where('role', 'parent')->get(); // Assuming 'role' is a column to distinguish user roles
        return Inertia::render('Payments/Create', ['parents' => $parents]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'parent_id' => 'required|exists:users,id',
            'payment_method' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        Payment::create($request->all());

        return redirect()->route('payments.index')->with('success', 'Payment created successfully.');
    }

    public function edit(Payment $payment)
    {
        return Inertia::render('Payments/Edit', ['payment' => $payment]);
    }

    public function update(Request $request, Payment $payment)
    {
        $request->validate([
            'parent_id' => 'required|exists:users,id',
            'payment_method' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        $payment->update($request->all());

        return redirect()->route('payments.index')->with('success', 'Payment updated successfully.');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index')->with('success', 'Payment deleted successfully.');
    }
}
