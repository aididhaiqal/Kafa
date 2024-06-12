<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminParentController extends Controller
{
    public function index()
    {
        $parents = User::where('role', 'parent')->get();
        return Inertia::render('Admin/Parents/Index', ['parents' => $parents]);
    }

    public function edit(User $parent)
    {
        return Inertia::render('Admin/Parents/Edit', ['parent' => $parent]);
    }

    public function update(Request $request, User $parent)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $parent->id,
        ]);

        $parent->update($request->all());

        return redirect()->route('admin.parents.index')->with('success', 'Parent profile updated successfully.');
    }

    public function destroy(User $parent)
    {
        $parent->delete();
        return redirect()->route('admin.parents.index')->with('success', 'Parent profile deleted successfully.');
    }
}
