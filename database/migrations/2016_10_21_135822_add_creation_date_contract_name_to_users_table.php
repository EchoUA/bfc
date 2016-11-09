<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCreationDateContractNameToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('creation_user')->nullable()->after('remember_token');
            $table->foreign('creation_user')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('creation_date')->nullable()->after('remember_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('creation_user');
            $table->dropColumn('creation_date');
        });
    }
}
