public class ContactToUpdate {
    public static void updateContactRecord(Id providedid){
        Contact fetchContact = [Select Id, FirstName From Contact where Id=: providedid];
        system.debug(fetchContact);
    }

}