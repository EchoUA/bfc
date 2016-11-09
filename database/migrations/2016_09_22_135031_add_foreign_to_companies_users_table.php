<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignToCompaniesUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies_users', function (Blueprint $table) {
            $table->unsignedInteger('company_id')->nullable()->change();
            $table->foreign('company_id')->references('id')->on('companies')->onUpdate('cascade')->onDelete('cascade')->change();
            $table->unsignedInteger('user_id')->nullable()->change();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies_users', function (Blueprint $table) {
            //
        });
    }
}
