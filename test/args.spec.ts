import {ArgumentParser} from 'argparse';
import * as sut from '../src/args';

const parser = sut.getParser();
beforeAll(() => {
  ArgumentParser.prototype.error = (e) => {
    throw e;
  };
});

describe('For connector args', () => {
  test('too few arguments', () => {
    expect(() => parser.parseArgs(['connector'])).toThrow('too few arguments');
  });

  describe('push_changes', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'push_changes']);
      expect(actual).toEqual({
        script: 'push_changes',
        scriptChoice: 'connector',
        forcePushChanges: false,
      });
    });

    test('force changes shorthand', () => {
      const actual = parser.parseArgs(['connector', 'push_changes', '-f']);
      expect(actual).toEqual({
        script: 'push_changes',
        scriptChoice: 'connector',
        forcePushChanges: true,
      });
    });

    test('force changes longhand', () => {
      const actual = parser.parseArgs(['connector', 'push_changes', '--force']);
      expect(actual).toEqual({
        script: 'push_changes',
        scriptChoice: 'connector',
        forcePushChanges: true,
      });
    });
  });

  describe('watch_changes', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'watch_changes']);
      expect(actual).toEqual({
        script: 'watch_changes',
        scriptChoice: 'connector',
      });
    });
  });

  describe('open_script', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'open_script']);
      expect(actual).toEqual({
        script: 'open_script',
        scriptChoice: 'connector',
      });
    });
  });

  describe('try_production', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'try_production']);
      expect(actual).toEqual({
        script: 'try_production',
        scriptChoice: 'connector',
      });
    });
  });

  describe('try_latest', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'try_latest']);
      expect(actual).toEqual({
        script: 'try_latest',
        scriptChoice: 'connector',
      });
    });
  });

  describe('update_production', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'update_production']);
      expect(actual).toEqual({
        script: 'update_production',
        scriptChoice: 'connector',
      });
    });
  });

  describe('open_template', () => {
    test('no additional args', () => {
      const actual = parser.parseArgs(['connector', 'open_template']);
      expect(actual).toEqual({
        script: 'open_template',
        scriptChoice: 'connector',
      });
    });
  });
});
