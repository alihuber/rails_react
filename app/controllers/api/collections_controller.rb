module API
  class CollectionsController < ApplicationController
    def index
      collections = ['Collection 1', 'Collection 2']

      render json: { collections: collections }
    end

    def create
      title = collections_params[:title]
      content = collections_params[:content]
      render json: { title: title, body: content }
    end

    def collections_params
      params.require(:collection).permit(:title, :content)
    end
  end
end