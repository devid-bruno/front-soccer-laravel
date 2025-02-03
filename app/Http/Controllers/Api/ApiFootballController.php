<?php

namespace App\Http\Controllers\Api;

use App\Services\ApiFootballClient as AppApiFootballClient;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ApiFootballController extends Controller
{
    public function __construct(
        protected AppApiFootballClient $client
    ) {}

    public function getMatches(){

        $validator = Validator::make(request()->all(), [
            'league' => 'required|integer',
            'season' => 'required|integer|digits:4',
            'date' => 'sometimes|date_format:Y-m-d',
            'team' => 'nullable|integer'
        ]);

        if($validator->fails()){
            return response()->json([
                'error' => 'Parâmetros inválidos',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $response = $this->client->get('/teams', $validator->validated());

            if($response->successful()){
                return $response->json();
            }
            return $response->json([
                'error' => 'Erro na API externa',
                'status' => $response->status()
            ], 502);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro interno no servidor',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
