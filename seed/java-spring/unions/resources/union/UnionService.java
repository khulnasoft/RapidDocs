/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.union;

import java.lang.String;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.union.types.Shape;

@RequestMapping(
    path = "/"
)
public interface UnionService {
  @GetMapping(
      value = "/{id}",
      produces = "application/json"
  )
  Shape get(@PathVariable("id") String id);

  @PatchMapping(
      value = "",
      produces = "application/json",
      consumes = "application/json"
  )
  boolean update(@RequestBody Shape body);
}
