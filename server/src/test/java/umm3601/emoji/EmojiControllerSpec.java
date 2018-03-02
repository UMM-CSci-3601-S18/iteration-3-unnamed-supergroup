package umm3601.emoji;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.Before;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class EmojiControllerSpec {
    private EmojiController emojiController;
    private ObjectId mattsId;
    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> emojiDocuments = db.getCollection("emojis");
        emojiDocuments.drop();
        List<Document> testEmojis = new ArrayList<>();
        testEmojis.add(Document.parse("{\n" +
            "                    owner: \"Ahnaf\",\n" +
            "                    mood: 5,\n" +
            "                    date: \"8/20/2015 20:00\",\n" +
            "                }"));
        testEmojis.add(Document.parse("{\n" +
            "                    owner: \"Chuck\",\n" +
            "                    mood: 3,\n" +
            "                    date: \"5/13/2000 14:00\",\n" +
            "                }"));
        testEmojis.add(Document.parse("{\n" +
            "                    owner: \"Kyle\",\n" +
            "                    mood: 2,\n" +
            "                    date: \"2/14/2010 09:00\",\n" +
            "                }"));

        mattsId = new ObjectId();
        BasicDBObject matt = new BasicDBObject("_id", mattsId);
        matt = matt.append("owner", "Matt")
            .append("mood", 1)
            .append("date", "11/11/2011 09:00");



        emojiDocuments.insertMany(testEmojis);
        emojiDocuments.insertOne(Document.parse(matt.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        emojiController = new EmojiController(db);
    }
}
