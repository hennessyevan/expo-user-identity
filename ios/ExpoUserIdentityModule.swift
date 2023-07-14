import ExpoModulesCore

import CloudKit
import Foundation

public class ExpoUserIdentityModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoUserIdentity")

    AsyncFunction("getUserIdentity") { (promise: Promise) in
      guard let ckIdentifier = Bundle.main.object(forInfoDictionaryKey: "CK_CONTAINER_IDENTIFIER") as? String else {
        return
      }

      CKContainer(identifier: ckIdentifier).fetchUserRecordID() { recordID, error in

        if let result = recordID?.recordName {
          promise.resolve(result)
        } else {
          if let ckerror = error as? CKError, ckerror.code == CKError.notAuthenticated {
            promise.reject("NO_ACCOUNT_ACCESS_ERROR", "No iCloud account is associated with the device, or access to the account is restricted");
            return;
          }

          if let error = error as? NSError {          
            promise.reject("NS_ERROR", error.localizedDescription);
            return;
          }
          
          promise.reject("UNKNOWN_ERROR", "An unknown error occurred")
        }
      }
    }
  }
}
