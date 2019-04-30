package persistence;

import java.beans.XMLEncoder;
import java.io.BufferedOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class XMLPersistence {
    public static void saveXML(Object obj) throws FileNotFoundException {
        XMLEncoder encoder = new XMLEncoder(new BufferedOutputStream(
                new FileOutputStream("Test.xml")
        ));

        encoder.writeObject(obj);
        encoder.close();
    }
}
