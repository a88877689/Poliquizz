package model;

import java.util.Collection;

public class Quizz {
    private String name;
    private Integer points;
    private String generalFeedback;
    private String wrongAnswer;
    private String correctAnswer;
    private Collection<QuizzItem> quizzes;

    public Quizz(String name, Integer points, String generalFeedback, String wrongAnswer, String correctAnswer, Collection<QuizzItem> quizzes) {
        this.name = name;
        this.points = points;
        this.generalFeedback = generalFeedback;
        this.wrongAnswer = wrongAnswer;
        this.correctAnswer = correctAnswer;
        this.quizzes = quizzes;
    }

    public Quizz() {}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Integer getPoints() {
        return this.points;
    }
    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getGeneralFeedback() {
        return this.generalFeedback;
    }
    public void setGeneralFeedback(String generalFeedback) {
        this.generalFeedback = generalFeedback;
    }

    public String getWrongAnswer() {
        return wrongAnswer;
    }
    public void setWrongAnswer(String wrongAnswer) {
        this.wrongAnswer = wrongAnswer;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }
    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Collection<QuizzItem> getQuizzes() {
        return quizzes;
    }
    public void setQuizzes(Collection<QuizzItem> quizzes) {
        this.quizzes = quizzes;
    }
}
