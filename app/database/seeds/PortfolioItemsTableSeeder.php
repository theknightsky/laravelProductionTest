<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PortfolioItemsTableSeeder extends Seeder {

	public function run()
	{
		// $faker = Faker::create();

		// foreach(range(1, 10) as $index)
		// {
		// 	PortfolioItem::create([
  //               'title' => "Passkeep",
  //               'description' => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi itaque ut exercitationem dolorem placeat, reprehenderit rerum minus ullam, tenetur assumenda earum eos a, omnis odio possimus est recusandae eum similique.",
  //               'resources' => "html,css,js",
		// 	]);
		// }

        PortfolioItem::create(array(
            'title' => 'EQR',
            'description' => 'description for EQR',
            'resources' => 'html,css,sass,js,angularjs',
        ));

        PortfolioItem::create(array(
            'title' => 'BMLM',
            'description' => 'description for BMLM',
            'resources' => 'html,css,sass,js,angularjs',
        ));
	}

}