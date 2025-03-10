/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.noreqbody;

import core.BearerAuth;
import java.lang.String;
import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.types.object.types.ObjectWithOptionalField;

@RequestMapping(
    path = "/no-req-body"
)
public interface NoReqBodyService {
  @GetMapping(
      value = "",
      produces = "application/json"
  )
  ObjectWithOptionalField getWithNoRequestBody(@RequestHeader("Authorization") BearerAuth auth,
      Principal principal);

  @PostMapping(
      value = "",
      produces = "application/json"
  )
  String postWithNoRequestBody(@RequestHeader("Authorization") BearerAuth auth,
      Principal principal);
}
