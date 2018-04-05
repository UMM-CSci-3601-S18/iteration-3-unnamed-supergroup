package umm3601.response;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import umm3601.ControllerSuperSpec;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class ResponseControllerSpec extends ControllerSuperSpec {
    private ResponseController responseController;
    private ObjectId id;

    @Before
    public void clearAndPopulateDB() {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> responseDocs = db.getCollection("responses");
        responseDocs.drop();

        List<Document> testResponses = new ArrayList<>();

        testResponses.add(Document.parse("{\n" +
            "name: \"Fluffy bunnies\", \n" +
            "link: \"https://fluffybun.ny/getBunny\",\n" +
            "email: \"aurora@boreal.is\", \n" +
            "date: \"1/1/2017 00:01\",\n" +
            "}"));
        testResponses.add(Document.parse("{\n" +
            "name: \"Satisfying video\", \n" +
            "link: \"https://mycylinder.nomnom/getNom\",\n" +
            "email: \"aurora@austral.is\", \n" +
            "date: \"7/1/2017 00:01\",\n" +
            "}"));
        testResponses.add(Document.parse("{\n" +
            "name: \"Motivational song\", \n" +
            "link: \"https://justdoit.justdo/getJustIt\",\n" +
            "email: \"shialabeouf@shiasurprise.net\", \n" +
            "date: \"1/1/2016 00:01\",\n" +
            "}"));

        id = new ObjectId();
        BasicDBObject stressRelief = new BasicDBObject("_id", id);
        stressRelief = stressRelief.append("name", "Stress relief for programmers")
            .append("link", "https://breathe.io")
            .append("email", "all@of.us")
            .append("date", "4/5/2018 8:16");

        responseDocs.insertMany(testResponses);
        responseDocs.insertOne(Document.parse(stressRelief.toJson()));

        responseController = new ResponseController(db);
    }

    private static String getEmail(BsonValue value) {
        BsonDocument doc = value.asDocument();
        return ((BsonString) doc.get("email")).getValue();
    }

    private static String getName(BsonValue value) {
        BsonDocument doc = value.asDocument();
        return ((BsonString) doc.get("name")).getValue();
    }

    @Test
    public void getAllResponses() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = responseController.getItems(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 entries", 4, docs.size());
        List<String> emails = docs
            .stream()
            .map(ResponseControllerSpec::getEmail)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedEmails = Arrays.asList("all@of.us" +
            "aurora@boreal.is",
            "aurora@austral.is",
            "shialabeouf@shiasurprise.net");
        assertEquals("Emails should match", expectedEmails, emails);
    }
}
