<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login user
     * Rate limited: 5 attempts per minute per IP+email
     * 
     * For SPA cookie-based authentication, we use Auth::login() to establish
     * a session instead of creating a token. Sanctum will handle the session
     * authentication for subsequent requests.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'max:255'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // Use same error message to prevent user enumeration
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // For SPA cookie-based auth, use Auth::login() to establish session
        // This will set the session cookie that Sanctum uses for authentication
        Auth::login($user, $request->boolean('remember', false));
        
        // Regenerate session ID to prevent session fixation attacks
        $request->session()->regenerate();

        return response()->json([
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()),
        ]);
    }

    /**
     * Logout user
     * 
     * For SPA cookie-based authentication, we invalidate the session
     * instead of deleting tokens.
     */
    public function logout(Request $request): JsonResponse
    {
        // For SPA cookie-based auth, logout using Auth facade
        Auth::logout();
        
        // Invalidate session
        $request->session()->invalidate();
        
        // Regenerate CSRF token
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Forgot password (placeholder)
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        // TODO: Implement password reset
        return response()->json(['message' => 'Password reset not implemented yet']);
    }

    /**
     * Reset password (placeholder)
     */
    public function resetPassword(Request $request): JsonResponse
    {
        // TODO: Implement password reset
        return response()->json(['message' => 'Password reset not implemented yet']);
    }
}
