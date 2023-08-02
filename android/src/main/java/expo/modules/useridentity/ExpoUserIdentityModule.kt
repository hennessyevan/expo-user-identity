package expo.modules.useridentity

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.exception.Exceptions

import android.accounts.Account
import android.content.Context
import android.accounts.AccountManager
import android.app.Activity

private const val USER_IDENTITY_CODE = 1;

class ExpoUserIdentityModule : Module() {
  private var pendingPromise: Promise? = null
  private fun handleError(promise: Promise, err: Exception) {
    promise.reject("[ExpoUserIdentity]", err.message, err)
  }

  override fun definition() = ModuleDefinition {
    Name("ExpoUserIdentity")

    AsyncFunction("getUserIdentity") { message: String?, accountType: String?, promise: Promise ->
      val allowableAccountTypes: Array<out String>
      if (accountType != null) {
        allowableAccountTypes = arrayOf(accountType)
      } else {
        allowableAccountTypes = arrayOf("com.google")
      }

      val description = message ?: "Please sign in to continue"

      val intent = AccountManager.newChooseAccountIntent(
        null,
        null,
        allowableAccountTypes,
        description,
        null,
        null,
        null
      )

      pendingPromise = promise

      currentActivity.startActivityForResult(intent, USER_IDENTITY_CODE)
    }

    OnActivityResult { _, (requestCode, resultCode, intent) ->
      if (requestCode != USER_IDENTITY_CODE || pendingPromise == null) {
        return@OnActivityResult
      }

      val promise = pendingPromise!!

      if (resultCode == Activity.RESULT_OK && intent != null) {
        try {
          val accountName = intent.getStringExtra(AccountManager.KEY_ACCOUNT_NAME)
          promise.resolve(accountName)
        } catch (e: CodedException) {
          handleError(promise, e)
        }
      }
    }
  }

  private val context
    get() = requireNotNull(appContext.reactContext)
  private val currentActivity
    get() = appContext.currentActivity ?: throw Exceptions.MissingActivity()
}
