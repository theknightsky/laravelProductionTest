<?php

class PortfolioItemsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /portfolioitems
	 *
	 * @return Response
	 */
	public function index()
	{
		$Items =  portfolioItem::all();

		// foreach($Items as $item){
		// 	$item->resources = json_decode($item->resources);
		// }

		 return $Items;
	}

	/**
	 * Display the specified resource.
	 * GET /portfolioitems/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$item = portfolioItem::findOrFail($id);

		return $item;

	}

}