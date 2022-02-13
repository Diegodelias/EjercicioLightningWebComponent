public inherited sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT  Name
            FROM Contact WHERE EMAIL = null];
    }

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
