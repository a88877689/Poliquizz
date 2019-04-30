package controllers;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.interceptor.ValidationAware;
import model.Quizz;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.apache.struts2.rest.RestActionSupport;
import persistence.XMLPersistence;

import java.util.Collection;

public class QuizzController extends RestActionSupport implements ModelDriven<Object>, ValidationAware {
    private static final Logger logger = LogManager.getLogger(QuizzController.class);

    private Quizz quizz = new Quizz();
    private Collection<Quizz> quizzes;

    public String index() {
        return Action.SUCCESS;
    }

    public HttpHeaders create() throws Exception {
        logger.info("Saving new quizz: {}", quizz.getName());

        XMLPersistence.saveXML(quizz);

        return new DefaultHttpHeaders("create")
                .withStatus(204);
    }

    public String show() {
        quizz = new Quizz();
        quizz.setName("Sports");

        return Action.SUCCESS;
    }

    public String update() {
        return Action.SUCCESS;
    }

    public String destroy() {
        return Action.SUCCESS;
    }

    public Object getModel() {
        return (quizzes == null ? quizz : quizzes);
    }
}
