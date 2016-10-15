var mongoose = require('mongoose');

module.exports = mongoose.model('LogTimer', {
      date: { type: Date, default: Date.now }
    , start: Date
    , startMorningBreake: Date
    , endMorningBreake: Date
    , startLunch: Date
    , endLunch: Date
    , startAfternonBreake: Date
    , endAfternonBreake: Date
    , end: Date
    , minutesOvertime: Number
});
