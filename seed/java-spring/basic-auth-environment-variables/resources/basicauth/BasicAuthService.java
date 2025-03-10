/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.basicauth;

import core.BasicAuth;
import java.lang.Object;
import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.errors.exceptions.BadRequest;
import resources.errors.exceptions.UnauthorizedRequest;

@RequestMapping(
    path = "/"
)
public interface BasicAuthService {
  @GetMapping(
      value = "/basic-auth",
      produces = "application/json"
  )
  boolean getWithBasicAuth(@RequestHeader("Authorization") BasicAuth auth, Principal principal)
      throws UnauthorizedRequest;

  @PostMapping(
      value = "/basic-auth",
      produces = "application/json",
      consumes = "application/json"
  )
  boolean postWithBasicAuth(@RequestHeader("Authorization") BasicAuth auth, Principal principal,
      @RequestBody Object body) throws UnauthorizedRequest, BadRequest;
}
