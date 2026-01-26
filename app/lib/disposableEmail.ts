/**
 * Disposable / temporary email blocklist (fraud prevention).
 */

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com", "10minutemail.net", "guerrillamail.com", "guerrillamail.org",
  "mailinator.com", "mailinator.net", "tempmail.com", "tempmail.net", "temp-mail.org",
  "throwaway.email", "fakeinbox.com", "trashmail.com", "yopmail.com", "getnada.com",
  "mailnesia.com", "sharklasers.com", "grr.la", "guerrillamailblock.com",
  "spam4.me", "dispostable.com", "maildrop.cc", "mailnull.com", "mailcatch.com",
  "tmpeml.com", "mohmal.com", "emailondeck.com", "mintemail.com", "mvrht.com",
  "vwh.sh", "debugmail.io", "mailmetrash.com", "trashmail.ws", "mytrashmail.com",
  "discard.email", "discardmail.com", "getairmail.com", "inboxkitten.com",
  "minimail.gq", "mytemp.email", "tempinbox.com", "emailfake.com", "mail-temp.com",
  "tempail.com", "fakeinbox.info", "trashcanmail.com", "33mail.com", "mailbox.in.ua",
]);

export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && DISPOSABLE_DOMAINS.has(domain);
}
