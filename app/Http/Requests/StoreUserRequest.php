<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'api_key' => 'required|string|max:80|unique:users',
            'password' => 'required|string|min:8',
        ];

        if ($this->isMethod('patch') || $this->isMethod('put')) {
            $userId = $this->route('user'); // Obtenha o ID do usuário a partir da rota
            $rules['api_key'] = 'required|string|max:255|unique:users,api_key,' . $userId;
            $rules['email'] = 'required|string|email|max:255|unique:users,email,' . $userId;
        }

        return $rules;
    }
}
