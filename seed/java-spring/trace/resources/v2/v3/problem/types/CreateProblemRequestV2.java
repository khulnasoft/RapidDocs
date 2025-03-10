/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.v2.v3.problem.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import org.jetbrains.annotations.NotNull;
import resources.commons.types.Language;
import resources.problem.types.ProblemDescription;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = CreateProblemRequestV2.Builder.class
)
public final class CreateProblemRequestV2 {
  private final String problemName;

  private final ProblemDescription problemDescription;

  private final CustomFiles customFiles;

  private final List<TestCaseTemplate> customTestCaseTemplates;

  private final List<TestCaseV2> testcases;

  private final Set<Language> supportedLanguages;

  private final boolean isPublic;

  private CreateProblemRequestV2(String problemName, ProblemDescription problemDescription,
      CustomFiles customFiles, List<TestCaseTemplate> customTestCaseTemplates,
      List<TestCaseV2> testcases, Set<Language> supportedLanguages, boolean isPublic) {
    this.problemName = problemName;
    this.problemDescription = problemDescription;
    this.customFiles = customFiles;
    this.customTestCaseTemplates = customTestCaseTemplates;
    this.testcases = testcases;
    this.supportedLanguages = supportedLanguages;
    this.isPublic = isPublic;
  }

  @JsonProperty("problemName")
  public String getProblemName() {
    return problemName;
  }

  @JsonProperty("problemDescription")
  public ProblemDescription getProblemDescription() {
    return problemDescription;
  }

  @JsonProperty("customFiles")
  public CustomFiles getCustomFiles() {
    return customFiles;
  }

  @JsonProperty("customTestCaseTemplates")
  public List<TestCaseTemplate> getCustomTestCaseTemplates() {
    return customTestCaseTemplates;
  }

  @JsonProperty("testcases")
  public List<TestCaseV2> getTestcases() {
    return testcases;
  }

  @JsonProperty("supportedLanguages")
  public Set<Language> getSupportedLanguages() {
    return supportedLanguages;
  }

  @JsonProperty("isPublic")
  public boolean getIsPublic() {
    return isPublic;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof CreateProblemRequestV2 && equalTo((CreateProblemRequestV2) other);
  }

  private boolean equalTo(CreateProblemRequestV2 other) {
    return problemName.equals(other.problemName) && problemDescription.equals(other.problemDescription) && customFiles.equals(other.customFiles) && customTestCaseTemplates.equals(other.customTestCaseTemplates) && testcases.equals(other.testcases) && supportedLanguages.equals(other.supportedLanguages) && isPublic == other.isPublic;
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.problemName, this.problemDescription, this.customFiles, this.customTestCaseTemplates, this.testcases, this.supportedLanguages, this.isPublic);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static ProblemNameStage builder() {
    return new Builder();
  }

  public interface ProblemNameStage {
    ProblemDescriptionStage problemName(@NotNull String problemName);

    Builder from(CreateProblemRequestV2 other);
  }

  public interface ProblemDescriptionStage {
    CustomFilesStage problemDescription(@NotNull ProblemDescription problemDescription);
  }

  public interface CustomFilesStage {
    IsPublicStage customFiles(@NotNull CustomFiles customFiles);
  }

  public interface IsPublicStage {
    _FinalStage isPublic(boolean isPublic);
  }

  public interface _FinalStage {
    CreateProblemRequestV2 build();

    _FinalStage customTestCaseTemplates(List<TestCaseTemplate> customTestCaseTemplates);

    _FinalStage addCustomTestCaseTemplates(TestCaseTemplate customTestCaseTemplates);

    _FinalStage addAllCustomTestCaseTemplates(List<TestCaseTemplate> customTestCaseTemplates);

    _FinalStage testcases(List<TestCaseV2> testcases);

    _FinalStage addTestcases(TestCaseV2 testcases);

    _FinalStage addAllTestcases(List<TestCaseV2> testcases);

    _FinalStage supportedLanguages(Set<Language> supportedLanguages);

    _FinalStage addSupportedLanguages(Language supportedLanguages);

    _FinalStage addAllSupportedLanguages(Set<Language> supportedLanguages);
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements ProblemNameStage, ProblemDescriptionStage, CustomFilesStage, IsPublicStage, _FinalStage {
    private String problemName;

    private ProblemDescription problemDescription;

    private CustomFiles customFiles;

    private boolean isPublic;

    private Set<Language> supportedLanguages = new LinkedHashSet<>();

    private List<TestCaseV2> testcases = new ArrayList<>();

    private List<TestCaseTemplate> customTestCaseTemplates = new ArrayList<>();

    private Builder() {
    }

    @java.lang.Override
    public Builder from(CreateProblemRequestV2 other) {
      problemName(other.getProblemName());
      problemDescription(other.getProblemDescription());
      customFiles(other.getCustomFiles());
      customTestCaseTemplates(other.getCustomTestCaseTemplates());
      testcases(other.getTestcases());
      supportedLanguages(other.getSupportedLanguages());
      isPublic(other.getIsPublic());
      return this;
    }

    @java.lang.Override
    @JsonSetter("problemName")
    public ProblemDescriptionStage problemName(@NotNull String problemName) {
      this.problemName = Objects.requireNonNull(problemName, "problemName must not be null");
      return this;
    }

    @java.lang.Override
    @JsonSetter("problemDescription")
    public CustomFilesStage problemDescription(@NotNull ProblemDescription problemDescription) {
      this.problemDescription = Objects.requireNonNull(problemDescription, "problemDescription must not be null");
      return this;
    }

    @java.lang.Override
    @JsonSetter("customFiles")
    public IsPublicStage customFiles(@NotNull CustomFiles customFiles) {
      this.customFiles = Objects.requireNonNull(customFiles, "customFiles must not be null");
      return this;
    }

    @java.lang.Override
    @JsonSetter("isPublic")
    public _FinalStage isPublic(boolean isPublic) {
      this.isPublic = isPublic;
      return this;
    }

    @java.lang.Override
    public _FinalStage addAllSupportedLanguages(Set<Language> supportedLanguages) {
      this.supportedLanguages.addAll(supportedLanguages);
      return this;
    }

    @java.lang.Override
    public _FinalStage addSupportedLanguages(Language supportedLanguages) {
      this.supportedLanguages.add(supportedLanguages);
      return this;
    }

    @java.lang.Override
    @JsonSetter(
        value = "supportedLanguages",
        nulls = Nulls.SKIP
    )
    public _FinalStage supportedLanguages(Set<Language> supportedLanguages) {
      this.supportedLanguages.clear();
      this.supportedLanguages.addAll(supportedLanguages);
      return this;
    }

    @java.lang.Override
    public _FinalStage addAllTestcases(List<TestCaseV2> testcases) {
      this.testcases.addAll(testcases);
      return this;
    }

    @java.lang.Override
    public _FinalStage addTestcases(TestCaseV2 testcases) {
      this.testcases.add(testcases);
      return this;
    }

    @java.lang.Override
    @JsonSetter(
        value = "testcases",
        nulls = Nulls.SKIP
    )
    public _FinalStage testcases(List<TestCaseV2> testcases) {
      this.testcases.clear();
      this.testcases.addAll(testcases);
      return this;
    }

    @java.lang.Override
    public _FinalStage addAllCustomTestCaseTemplates(
        List<TestCaseTemplate> customTestCaseTemplates) {
      this.customTestCaseTemplates.addAll(customTestCaseTemplates);
      return this;
    }

    @java.lang.Override
    public _FinalStage addCustomTestCaseTemplates(TestCaseTemplate customTestCaseTemplates) {
      this.customTestCaseTemplates.add(customTestCaseTemplates);
      return this;
    }

    @java.lang.Override
    @JsonSetter(
        value = "customTestCaseTemplates",
        nulls = Nulls.SKIP
    )
    public _FinalStage customTestCaseTemplates(List<TestCaseTemplate> customTestCaseTemplates) {
      this.customTestCaseTemplates.clear();
      this.customTestCaseTemplates.addAll(customTestCaseTemplates);
      return this;
    }

    @java.lang.Override
    public CreateProblemRequestV2 build() {
      return new CreateProblemRequestV2(problemName, problemDescription, customFiles, customTestCaseTemplates, testcases, supportedLanguages, isPublic);
    }
  }
}
