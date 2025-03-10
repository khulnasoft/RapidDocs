/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.path;

import java.lang.Boolean;
import java.lang.String;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import types.SendResponse;

@RequestMapping(
    path = "/"
)
public interface PathService {
  @PostMapping(
      value = "/path/{id}",
      produces = "application/json"
  )
  SendResponse send(@RequestHeader("X-API-Version") String version,
      @RequestHeader("X-API-Enable-Audit-Logging") Boolean auditLogging,
      @PathVariable("id") String id);
}
