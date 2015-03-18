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
		$Items =  PortfolioItem::all();

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
		$item = PortfolioItem::findOrFail($id);

		return $item;

	}

}