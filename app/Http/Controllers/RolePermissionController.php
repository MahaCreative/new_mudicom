<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    public function index(Request $request)
    {
        $permission = Permission::all()->pluck('name');
        $role = Role::with('permissions')->latest()->get();


        return inertia('Admin/Role/Index', compact('permission', 'role'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|alpha_dash|min:3|max:50|unique:roles,name',
            'permissions' => 'array|min:1',
            'permissions.*' => 'required|string'
        ]);
        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);
    }

    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        $request->validate([
            'name' => 'required|alpha_dash|min:3|max:50|unique:roles,name,' . $role->id,
            'permissions' => 'array|min:1',
            'permissions.*' => 'required|string'
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);
    }

    public function delete(Request $request, $id)
    {
        Role::find($id)->delete();
    }
}
