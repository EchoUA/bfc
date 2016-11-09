<?php

use Illuminate\Database\Seeder;

class BCpRoleToRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'bcp',
            'display_name' => 'BCp'
        ]);
    }
}
