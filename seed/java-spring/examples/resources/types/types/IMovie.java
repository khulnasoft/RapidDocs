/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.types.types;

import java.lang.Object;
import java.lang.String;
import java.util.Map;
import java.util.Optional;
import resources.commons.types.types.Tag;

public interface IMovie {
  MovieId getId();

  Optional<MovieId> getPrequel();

  String getTitle();

  String getFrom();

  double getRating();

  String getType();

  Tag getTag();

  Optional<String> getBook();

  Map<String, Object> getMetadata();

  long getRevenue();
}
