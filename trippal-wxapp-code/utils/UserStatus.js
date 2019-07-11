// /utils/UserStatus.js

const USER_LOCK_STATUS = {
  'NORMAL': 0,
  'LOCKED': 1,
  'MASK': 0xfffe
}

const USER_PASSWD_STATUS = {
  'NOT_SET': 0,
  'SET': 2,
  'MASK': 0xfffd
}

const SPEAKER_APPLY_STATUS = {
  'INIT': 0,
  'APPLYING': 4,
  'PASSED': 8,
  'FAILED': 12,
  'MASK': 0xfff3
}

function getUserLockStatus(stts) {
  if ((stts & ~USER_LOCK_STATUS.MASK) > 0) {
    return USER_LOCK_STATUS.LOCKED
  }
  return USER_LOCK_STATUS.NORMAL
}

function setUserLockStatus(origStts, newStts) {
  var finalStts = (origStts & USER_LOCK_STATUS.MASK) | newStts
  return finalStts
}

function getUserPasswdStatus(stts) {
  if ((stts & ~USER_PASSWD_STATUS.MASK) > 0) {
    return USER_PASSWD_STATUS.SET
  }
  return USER_PASSWD_STATUS.NOT_SET
}

function setUserPasswdStatus(origStts, newStts) {
  var finalStts = (origStts & USER_PASSWD_STATUS.MASK) | newStts
  return finalStts
}

function getSpeakerApplyStatus(stts) {
  switch (stts & ~SPEAKER_APPLY_STATUS.MASK) {
    case SPEAKER_APPLY_STATUS.APPLYING:
      return SPEAKER_APPLY_STATUS.APPLYING
    case SPEAKER_APPLY_STATUS.PASSED:
      return SPEAKER_APPLY_STATUS.PASSED
    case SPEAKER_APPLY_STATUS.FAILED:
      return SPEAKER_APPLY_STATUS.FAILED
  }
  return SPEAKER_APPLY_STATUS.INIT
}

function setSpeakerApplyStatus(origStts, newStts) {
  var finalStts = (origStts & SPEAKER_APPLY_STATUS.MASK) | newStts
  return finalStts
}

module.exports = {
  USER_LOCK_STATUS,
  USER_PASSWD_STATUS,
  SPEAKER_APPLY_STATUS,
  getUserLockStatus,
  setUserLockStatus,
  getUserPasswdStatus,
  setUserPasswdStatus,
  getSpeakerApplyStatus,
  setSpeakerApplyStatus
}