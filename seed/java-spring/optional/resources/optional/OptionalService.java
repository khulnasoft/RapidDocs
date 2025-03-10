/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.optional;

import java.lang.Object;
import java.lang.String;
import java.util.Map;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(
    path = "/"
)
public interface OptionalService {
  @PostMapping(
      value = "/send-optional-body",
      produces = "application/json",
      consumes = "application/json"
  )
  String sendOptionalBody(@RequestBody Optional<Map<String, Object>> body);
}
