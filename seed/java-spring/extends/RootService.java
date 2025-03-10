/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import requests.Inlined;

@RequestMapping(
    path = "/extends"
)
public interface RootService {
  @PostMapping(
      value = "/extended-inline-request-body",
      produces = "application/json",
      consumes = "application/json"
  )
  void extendedInlineRequestBody(@RequestBody Inlined body);
}
