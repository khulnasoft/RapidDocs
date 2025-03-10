/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.propertybasederror;

import java.lang.String;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.errors.exceptions.PropertyBasedErrorTest;

@RequestMapping(
    path = "/"
)
public interface PropertyBasedErrorService {
  @GetMapping(
      value = "/property-based-error",
      produces = "application/json"
  )
  String throwError() throws PropertyBasedErrorTest;
}
