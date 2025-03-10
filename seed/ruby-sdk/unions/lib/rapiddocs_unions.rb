# frozen_string_literal: true

require_relative "types_export"
require_relative "requests"
require_relative "rapiddocs_unions/union/client"

module SeedUnionsClient
  class Client
    # @return [SeedUnionsClient::UnionClient]
    attr_reader :union

    # @param base_url [String]
    # @param max_retries [Long] The number of times to retry a failed request, defaults to 2.
    # @param timeout_in_seconds [Long]
    # @return [SeedUnionsClient::Client]
    def initialize(base_url: nil, max_retries: nil, timeout_in_seconds: nil)
      @request_client = SeedUnionsClient::RequestClient.new(
        base_url: base_url,
        max_retries: max_retries,
        timeout_in_seconds: timeout_in_seconds
      )
      @union = SeedUnionsClient::UnionClient.new(request_client: @request_client)
    end
  end

  class AsyncClient
    # @return [SeedUnionsClient::AsyncUnionClient]
    attr_reader :union

    # @param base_url [String]
    # @param max_retries [Long] The number of times to retry a failed request, defaults to 2.
    # @param timeout_in_seconds [Long]
    # @return [SeedUnionsClient::AsyncClient]
    def initialize(base_url: nil, max_retries: nil, timeout_in_seconds: nil)
      @async_request_client = SeedUnionsClient::AsyncRequestClient.new(
        base_url: base_url,
        max_retries: max_retries,
        timeout_in_seconds: timeout_in_seconds
      )
      @union = SeedUnionsClient::AsyncUnionClient.new(request_client: @async_request_client)
    end
  end
end
