<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\ApiFootballClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ApiFootballClient::class, function ($app){
            return new ApiFootballClient();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
