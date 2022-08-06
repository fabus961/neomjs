import Base            from '../container/Base.mjs';
import ClassSystemUtil from '../util/ClassSystem.mjs';
import GroupStore      from './store/Groups.mjs';
import ItemStore       from './store/Items.mjs';

/**
 * @class Neo.sitemap.Container
 * @extends Neo.container.Base
 */
class Container extends Base {
    static getConfig() {return {
        /*
         * @member {String} className='Neo.sitemap.Container'
         * @protected
         */
        className: 'Neo.sitemap.Container',
        /*
         * @member {String} ntype='sitemap'
         * @protected
         */
        ntype: 'sitemap',
        /*
         * @member {Neo.sitemap.store.Groups|null} groupStore_=null
         */
        groupStore_: null,
        /*
         * @member {Object} itemDefaults
         */
        itemDefaults: {
            module: Base,
            cls   : ['neo-sitemap-column', 'neo-container']
        },
        /*
         * @member {Neo.sitemap.store.Items|null} itemStore_=null
         */
        itemStore_: null
    }}

    /**
     * Triggered after the itemStore config got changed
     * @param {Neo.sitemap.store.Items|null} value
     * @param {Neo.sitemap.store.Items|null} oldValue
     * @protected
     */
    afterSetGroupStore(value, oldValue) {
        let me = this;

        value?.on({
            filter      : 'onGroupStoreFilter',
            load        : 'onGroupStoreLoad',
            recordChange: 'onGroupStoreRecordChange',
            sort        : 'onGroupStoreSort',
            scope       : me
        });

        value?.getCount() > 0 && me.itemStore.getCount() > 0 && me.createColumns();
    }

    /**
     * Triggered after the itemStore config got changed
     * @param {Neo.sitemap.store.Items|null} value
     * @param {Neo.sitemap.store.Items|null} oldValue
     * @protected
     */
    afterSetItemStore(value, oldValue) {
        let me = this;

        value?.on({
            filter      : 'onItemStoreFilter',
            load        : 'onItemStoreLoad',
            recordChange: 'onItemStoreRecordChange',
            sort        : 'onItemStoreSort',
            scope       : me
        });
    }

    /**
     * Triggered before the groupStore config gets changed.
     * @param {Object|Neo.data.Store} value
     * @param {Object|Neo.data.Store} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetGroupStore(value, oldValue) {
        oldValue?.destroy();
        return ClassSystemUtil.beforeSetInstance(value, GroupStore);
    }

    /**
     * Triggered before the itemStore config gets changed.
     * @param {Object|Neo.data.Store} value
     * @param {Object|Neo.data.Store} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetItemStore(value, oldValue) {
        oldValue?.destroy();
        return ClassSystemUtil.beforeSetInstance(value, ItemStore);
    }

    /**
     *
     */
    createColumns() {
        let me      = this,
            groups  = me.groupStore.items,
            columns = Math.max(...groups.map(e => e.column + 1)),
            i       = 0,
            items   = [];

        for (; i < columns; i++) {
            items.push({});
        }

        me.items = items;
    }

    /**
     *
     */
    onGroupStoreFilter() {
        console.log('onItemStoreFilter');
    }

    /**
     *
     */
    onGroupStoreLoad() {
        console.log('onItemStoreLoad');
    }

    /**
     *
     */
    onGroupStoreRecordChange() {
        console.log('onItemStoreRecordChange');
    }

    /**
     *
     */
    onGroupStoreSort() {
        console.log('onItemStoreSort');
    }

    /**
     *
     */
    onItemStoreFilter() {
        console.log('onItemStoreFilter');
    }

    /**
     *
     */
    onItemStoreLoad() {
        console.log('onItemStoreLoad');
    }

    /**
     *
     */
    onItemStoreRecordChange() {
        console.log('onItemStoreRecordChange');
    }

    /**
     *
     */
    onItemStoreSort() {
        console.log('onItemStoreSort');
    }
}

Neo.applyClassConfig(Container);

export default Container;
