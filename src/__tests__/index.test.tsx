import { NativeModules } from 'react-native';
import PiwikProSdk from '../';

jest.mock('react-native', () => ({
  NativeModules: {
    PiwikProSdk: {
      init: jest.fn(),
      trackScreen: jest.fn(),
      trackCustomEvent: jest.fn(),
      trackException: jest.fn(),
      trackSocialInteraction: jest.fn(),
      trackDownload: jest.fn(),
      trackOutlink: jest.fn(),
      dispatch: jest.fn(),
      setDispatchInterval: jest.fn(),
      getDispatchInterval: jest.fn(),
      setIncludeDefaultCustomVariables: jest.fn(),
      getIncludeDefaultCustomVariables: jest.fn(),
      setAnonymizationState: jest.fn(),
      isAnonymizationOn: jest.fn(),
    },
  },
  Platform: {
    select: jest.fn(),
  },
}));

const commonEventOptions: CommonEventOptions = {
  customDimensions: { 1: 'pizza' },
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
};

describe('PiwikProSdk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#init', () => {
    it('calls init from native SDK', async () => {
      const apiUrl = 'https://example.com';
      const siteId = '1111-2222-3333-dddd';

      await PiwikProSdk.init(apiUrl, siteId);

      expect(NativeModules.PiwikProSdk.init).toHaveBeenCalledWith(
        apiUrl,
        siteId
      );
    });
  });

  describe('#trackScreen', () => {
    it('calls trackScreen from native SDK', async () => {
      const path = 'example/path';
      const options: TrackScreenOptions = {
        title: 'newAction',
        ...commonEventOptions,
      };

      await PiwikProSdk.trackScreen(path, options);

      expect(NativeModules.PiwikProSdk.trackScreen).toHaveBeenCalledWith(
        path,
        options
      );
    });

    it('calls trackScreen from native SDK with path when options are not passed', async () => {
      const path = 'example/path';

      await PiwikProSdk.trackScreen(path);

      expect(NativeModules.PiwikProSdk.trackScreen).toHaveBeenCalledWith(
        path,
        undefined
      );
    });
  });

  describe('#trackCustomEvent', () => {
    it('calls trackCustomEvent from native SDK', async () => {
      const category = 'example_category';
      const action = 'add';
      const options: TrackCustomEventOptions = {
        name: 'customEvent',
        path: 'some/path',
        ...commonEventOptions,
      };

      await PiwikProSdk.trackCustomEvent(category, action, options);

      expect(NativeModules.PiwikProSdk.trackCustomEvent).toHaveBeenCalledWith(
        category,
        action,
        options
      );
    });

    it('calls trackCustomEvent from native SDK with path when options are not passed', async () => {
      const category = 'example_category';
      const action = 'add';

      await PiwikProSdk.trackCustomEvent(category, action);

      expect(NativeModules.PiwikProSdk.trackCustomEvent).toHaveBeenCalledWith(
        category,
        action,
        undefined
      );
    });
  });

  describe('#trackException', () => {
    it('calls trackException from native SDK', async () => {
      const description = 'sample exception';
      const isFatal = true;
      const options: TrackExceptionOptions = commonEventOptions;

      await PiwikProSdk.trackException(description, isFatal, options);

      expect(NativeModules.PiwikProSdk.trackException).toHaveBeenCalledWith(
        description,
        isFatal,
        options
      );
    });

    it('calls trackException from native SDK with path when options are not passed', async () => {
      const description = 'sample exception';
      const isFatal = true;

      await PiwikProSdk.trackException(description, isFatal);

      expect(NativeModules.PiwikProSdk.trackException).toHaveBeenCalledWith(
        description,
        isFatal,
        undefined
      );
    });
  });

  describe('#trackSocialInteraction', () => {
    it('calls trackSocialInteraction from native SDK', async () => {
      const interaction = 'sample exception';
      const network = 'facebook';
      const options: TrackSocialInteractionOptions = {
        ...commonEventOptions,
        target: 'photo',
      };

      await PiwikProSdk.trackSocialInteraction(interaction, network, options);

      expect(
        NativeModules.PiwikProSdk.trackSocialInteraction
      ).toHaveBeenCalledWith(interaction, network, options);
    });

    it('calls trackSocialInteraction from native SDK with path when options are not passed', async () => {
      const interaction = 'sample exception';
      const network = 'facebook';

      await PiwikProSdk.trackSocialInteraction(interaction, network);

      expect(
        NativeModules.PiwikProSdk.trackSocialInteraction
      ).toHaveBeenCalledWith(interaction, network, undefined);
    });
  });

  describe('#trackDownload', () => {
    it('calls trackDownload from native SDK', async () => {
      const url = 'http://your.server.com/bonusmap.zip';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackDownload(url, options);

      expect(NativeModules.PiwikProSdk.trackDownload).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('calls trackDownload from native SDK with path when options are not passed', async () => {
      const url = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackDownload(url);

      expect(NativeModules.PiwikProSdk.trackDownload).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#trackOutlink', () => {
    it('calls trackOutlink from native SDK', async () => {
      const url = 'http://your.server.com/bonusmap.zip';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackOutlink(url, options);

      expect(NativeModules.PiwikProSdk.trackOutlink).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('calls trackOutlink from native SDK with path when options are not passed', async () => {
      const url = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackOutlink(url);

      expect(NativeModules.PiwikProSdk.trackOutlink).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#dispatch', () => {
    it('calls dispatch from native SDK', async () => {
      await PiwikProSdk.dispatch();

      expect(NativeModules.PiwikProSdk.dispatch).toHaveBeenCalled();
    });
  });

  describe('#setDispatchInterval', () => {
    it('calls setDispatchInterval from native SDK', async () => {
      await PiwikProSdk.setDispatchInterval(5);

      expect(
        NativeModules.PiwikProSdk.setDispatchInterval
      ).toHaveBeenCalledWith(5);
    });

    it('throws an error if setDispatchInterval was called with float number', async () => {
      await expect(() => PiwikProSdk.setDispatchInterval(5.1)).rejects.toThrow(
        new Error('Parameter must be an integer number')
      );

      expect(
        NativeModules.PiwikProSdk.setDispatchInterval
      ).not.toHaveBeenCalled();
    });
  });

  describe('#getDispatchInterval', () => {
    it('calls getDispatchInterval from native SDK', async () => {
      NativeModules.PiwikProSdk.getDispatchInterval.mockResolvedValue(5);
      const result = await PiwikProSdk.getDispatchInterval();

      expect(result).toStrictEqual(5);
    });
  });

  describe('#setIncludeDefaultCustomVariables', () => {
    it('calls setIncludeDefaultCustomVariables from native SDK', async () => {
      await PiwikProSdk.setIncludeDefaultCustomVariables(false);

      expect(
        NativeModules.PiwikProSdk.setIncludeDefaultCustomVariables
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('#getIncludeDefaultCustomVariables', () => {
    it('calls getIncludeDefaultCustomVariables from native SDK', async () => {
      NativeModules.PiwikProSdk.getIncludeDefaultCustomVariables.mockResolvedValue(
        false
      );
      const result = await PiwikProSdk.getIncludeDefaultCustomVariables();

      expect(result).toStrictEqual(false);
    });
  });

  describe('#setAnonymizationState', () => {
    it('calls setAnonymizationState from native SDK', async () => {
      await PiwikProSdk.setAnonymizationState(false);

      expect(
        NativeModules.PiwikProSdk.setAnonymizationState
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('#isAnonymizationOn', () => {
    it('calls isAnonymizationOn from native SDK', async () => {
      NativeModules.PiwikProSdk.isAnonymizationOn.mockResolvedValue(true);
      const result = await PiwikProSdk.isAnonymizationOn();

      expect(result).toStrictEqual(true);
    });
  });
});
