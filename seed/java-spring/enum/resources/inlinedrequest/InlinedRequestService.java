/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.inlinedrequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.inlinedrequest.requests.SendEnumInlinedRequest;

@RequestMapping(
    path = "/"
)
public interface InlinedRequestService {
  @PostMapping(
      value = "/inlined",
      produces = "application/json",
      consumes = "application/json"
  )
  void send(@RequestBody SendEnumInlinedRequest body);
}
