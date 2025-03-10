/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.unknown;

import java.lang.Object;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.unknown.types.MyObject;

@RequestMapping(
    path = "/"
)
public interface UnknownService {
  @PostMapping(
      value = "",
      produces = "application/json",
      consumes = "application/json"
  )
  List<Object> post(@RequestBody Object body);

  @PostMapping(
      value = "/with-object",
      produces = "application/json",
      consumes = "application/json"
  )
  List<Object> postObject(@RequestBody MyObject body);
}
