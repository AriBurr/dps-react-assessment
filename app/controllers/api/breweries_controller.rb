class Api::BreweriesController < ApplicationController
  # brewery_db.breweries.all(established: 2006)
  # brewery_db.breweries.find('d1zSa7')
  # brewery_db.brewery('d1zSa7').beers

  def all
    send_response(brew_client.breweries.all(p: @page))
  end

  def by_id
    send_response(brew_client.breweries.all(ids: params[:id], p: @page))
  end
end
