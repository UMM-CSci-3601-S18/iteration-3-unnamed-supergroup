package umm3601.emoji;

import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import sun.util.locale.provider.DateFormatProviderImpl;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;

public class EmojiController {
    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> emojiCollection;

    /**
     * Construct a controller for users.
     *
     * @param database the database containing user data
     */
    public EmojiController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        emojiCollection = database.getCollection("emojis");
    }

    public String addNewEmoji(String ownerId, int rating, String date) {

        Document newEmoji = new Document();
        newEmoji.append("owner", ownerId);
        newEmoji.append("rating", rating);
        newEmoji.append("date", date);

        try {
            emojiCollection.insertOne(newEmoji);

            ObjectId id = newEmoji.getObjectId("_id");
            System.err.println("Successfully added new emoji [_id=" + id + ", owner=" + ownerId + ", rating="
                + rating + " date=" + date + ']');
            // return JSON.serialize(newUser);
            return JSON.serialize(id);
        } catch(MongoException me) {
            me.printStackTrace();
            return null;
        }
    }
}
