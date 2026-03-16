import Iter "mo:core/Iter";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  var admin : ?Principal = null;
  let contactMessages = List.empty<ContactMessage>();

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  public shared ({ caller }) func initializeAdmin() : async () {
    if (admin != null) {
      Runtime.trap("Admin already initialized");
    };
    admin := ?caller;
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    switch (admin) {
      case (null) { Runtime.trap("Admin must be initialized first") };
      case (_) {
        let newMessage : ContactMessage = {
          name;
          email;
          message;
        };
        contactMessages.add(newMessage);
      };
    };
  };

  public query ({ caller }) func getAllMessages() : async [ContactMessage] {
    switch (admin) {
      case (null) { Runtime.trap("Admin must be initialized first") };
      case (?adminPrincipal) {
        if (caller != adminPrincipal) {
          Runtime.trap("Only the admin can access this function.");
        } else {
          contactMessages.toArray();
        };
      };
    };
  };
};
