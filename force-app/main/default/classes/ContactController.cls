public inherited sharing class ContactController {
    @AuraEnabled
    public static List<Contact> InsertContact(String contactDataString) {
        try{
            List<Contact> contactList = (List<Contact>)System.JSON.deserializeStrict(contactDataString, List<Contact>.Class);
            Database.insert(contactList);
            return contactList;
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
