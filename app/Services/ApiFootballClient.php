<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;

class ApiFootballClient
{

    protected $baseUrl = 'https://v3.football.api-sports.io';
    protected $apiKey;
    protected $host;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->apiKey = config('services.api_football.key');
        $this->host = config('services.api_football.host');
    }

    public function get(string $endpoint, array $params = []){
        return Http::withHeaders([
            'X-RapidAPI-Key' => $this->apiKey,
            'X-RapidAPI-Host' => $this->host,
        ])->get($this->baseUrl . $endpoint, $params);
    }
}
