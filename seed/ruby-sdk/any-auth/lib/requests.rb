# frozen_string_literal: true
require "faraday"
require "faraday/retry"
require "faraday"
require "faraday"
require "async/http/faraday"
require "faraday/retry"

module SeedAnyAuthClient
  class RequestClient
  # @return [Faraday] 
    attr_reader :conn
  # @return [String] 
    attr_reader :base_url
  # @return [String] 
    attr_reader :token
  # @return [String] 
    attr_reader :api_key
  # @return [String, Method] 
    attr_reader :token


    # @param base_url [String] 
    # @param max_retries [Long] The number of times to retry a failed request, defaults to 2.
    # @param timeout_in_seconds [Long] 
    # @param token [String] 
    # @param api_key [String] 
    # @param token [String, Method] 
    # @return [SeedAnyAuthClient::RequestClient]
    def initialize(base_url: nil, max_retries: nil, timeout_in_seconds: nil, token: ENV["MY_TOKEN"], api_key: ENV["MY_API_KEY"], token: nil)
      @base_url = base_url
      @token = "Bearer #{token}"
      @api_key = api_key
      @token = token
      @conn = Faraday.new do | faraday |
  faraday.request :json
  faraday.response :raise_error, include_request: true
  unless max_retries.nil?
    faraday.request :retry ,  { max: max_retries }
  end
  unless timeout_in_seconds.nil?
    faraday.options.timeout = timeout_in_seconds
  end
end
    end
    # @param request_options [SeedAnyAuthClient::RequestOptions] 
    # @return [String]
    def get_url(request_options: nil)
      request_options&.base_url || @base_url
    end
    # @return [Hash{String => String}]
    def get_headers
      headers = { "X-Rapiddocs-Language": 'Ruby', "X-Rapiddocs-SDK-Name": 'rapiddocs_any_auth', "X-Rapiddocs-SDK-Version": '0.0.1' }
      headers["Authorization"] = ((@token.is_a? Method) ? @token.call : @token) unless @token.nil?
      headers["X-API-Key"] = ((@api_key.is_a? Method) ? @api_key.call : @api_key) unless @api_key.nil?
      headers["Authorization"] = ((@token.is_a? Method) ? @token.call : @token) unless @token.nil?
 headers
    end
  end
  class AsyncRequestClient
  # @return [Faraday] 
    attr_reader :conn
  # @return [String] 
    attr_reader :base_url
  # @return [String] 
    attr_reader :token
  # @return [String] 
    attr_reader :api_key
  # @return [String, Method] 
    attr_reader :token


    # @param base_url [String] 
    # @param max_retries [Long] The number of times to retry a failed request, defaults to 2.
    # @param timeout_in_seconds [Long] 
    # @param token [String] 
    # @param api_key [String] 
    # @param token [String, Method] 
    # @return [SeedAnyAuthClient::AsyncRequestClient]
    def initialize(base_url: nil, max_retries: nil, timeout_in_seconds: nil, token: ENV["MY_TOKEN"], api_key: ENV["MY_API_KEY"], token: nil)
      @base_url = base_url
      @token = "Bearer #{token}"
      @api_key = api_key
      @token = token
      @conn = Faraday.new do | faraday |
  faraday.request :json
  faraday.response :raise_error, include_request: true
  faraday.adapter :async_http
  unless max_retries.nil?
    faraday.request :retry ,  { max: max_retries }
  end
  unless timeout_in_seconds.nil?
    faraday.options.timeout = timeout_in_seconds
  end
end
    end
    # @param request_options [SeedAnyAuthClient::RequestOptions] 
    # @return [String]
    def get_url(request_options: nil)
      request_options&.base_url || @base_url
    end
    # @return [Hash{String => String}]
    def get_headers
      headers = { "X-Rapiddocs-Language": 'Ruby', "X-Rapiddocs-SDK-Name": 'rapiddocs_any_auth', "X-Rapiddocs-SDK-Version": '0.0.1' }
      headers["Authorization"] = ((@token.is_a? Method) ? @token.call : @token) unless @token.nil?
      headers["X-API-Key"] = ((@api_key.is_a? Method) ? @api_key.call : @api_key) unless @api_key.nil?
      headers["Authorization"] = ((@token.is_a? Method) ? @token.call : @token) unless @token.nil?
 headers
    end
  end
# Additional options for request-specific configuration when calling APIs via the
#  SDK.
  class RequestOptions
  # @return [String] 
    attr_reader :base_url
  # @return [String] 
    attr_reader :token
  # @return [String] 
    attr_reader :api_key
  # @return [String, Method] 
    attr_reader :token
  # @return [Hash{String => Object}] 
    attr_reader :additional_headers
  # @return [Hash{String => Object}] 
    attr_reader :additional_query_parameters
  # @return [Hash{String => Object}] 
    attr_reader :additional_body_parameters
  # @return [Long] 
    attr_reader :timeout_in_seconds


    # @param base_url [String] 
    # @param token [String] 
    # @param api_key [String] 
    # @param token [String, Method] 
    # @param additional_headers [Hash{String => Object}] 
    # @param additional_query_parameters [Hash{String => Object}] 
    # @param additional_body_parameters [Hash{String => Object}] 
    # @param timeout_in_seconds [Long] 
    # @return [SeedAnyAuthClient::RequestOptions]
    def initialize(base_url: nil, token: nil, api_key: nil, token: nil, additional_headers: nil, additional_query_parameters: nil, additional_body_parameters: nil, timeout_in_seconds: nil)
      @base_url = base_url
      @token = token
      @api_key = api_key
      @token = token
      @additional_headers = additional_headers
      @additional_query_parameters = additional_query_parameters
      @additional_body_parameters = additional_body_parameters
      @timeout_in_seconds = timeout_in_seconds
    end
  end
# Additional options for request-specific configuration when calling APIs via the
#  SDK.
  class IdempotencyRequestOptions
  # @return [String] 
    attr_reader :base_url
  # @return [String] 
    attr_reader :token
  # @return [String] 
    attr_reader :api_key
  # @return [String, Method] 
    attr_reader :token
  # @return [Hash{String => Object}] 
    attr_reader :additional_headers
  # @return [Hash{String => Object}] 
    attr_reader :additional_query_parameters
  # @return [Hash{String => Object}] 
    attr_reader :additional_body_parameters
  # @return [Long] 
    attr_reader :timeout_in_seconds


    # @param base_url [String] 
    # @param token [String] 
    # @param api_key [String] 
    # @param token [String, Method] 
    # @param additional_headers [Hash{String => Object}] 
    # @param additional_query_parameters [Hash{String => Object}] 
    # @param additional_body_parameters [Hash{String => Object}] 
    # @param timeout_in_seconds [Long] 
    # @return [SeedAnyAuthClient::IdempotencyRequestOptions]
    def initialize(base_url: nil, token: nil, api_key: nil, token: nil, additional_headers: nil, additional_query_parameters: nil, additional_body_parameters: nil, timeout_in_seconds: nil)
      @base_url = base_url
      @token = token
      @api_key = api_key
      @token = token
      @additional_headers = additional_headers
      @additional_query_parameters = additional_query_parameters
      @additional_body_parameters = additional_body_parameters
      @timeout_in_seconds = timeout_in_seconds
    end
  end
end