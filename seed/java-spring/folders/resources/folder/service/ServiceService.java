/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.folder.service;

import java.lang.Object;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.folder.service.exceptions.NotFoundError;

@RequestMapping(
    path = "/service"
)
public interface ServiceService {
  @GetMapping(
      value = "",
      produces = "application/json"
  )
  void endpoint();

  @PostMapping(
      value = "",
      produces = "application/json",
      consumes = "application/json"
  )
  void unknownRequest(@RequestBody Object body) throws NotFoundError;
}
