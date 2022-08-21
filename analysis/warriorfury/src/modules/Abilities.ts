import SPELLS from 'common/SPELLS';
import COVENANTS from 'game/shadowlands/COVENANTS';
import ISSUE_IMPORTANCE from 'parser/core/ISSUE_IMPORTANCE';
import CoreAbilities from 'parser/core/modules/Abilities';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';

//https://www.warcraftlogs.com/reports/9Vw8TvjHNfXgWyP7#fight=19&type=summary&source=21 2+ cold steel hot blood

class Abilities extends CoreAbilities {
  spellbook() {
    const combatant = this.selectedCombatant;
    return [
      // Rotational
      {
        spell: SPELLS.BLOODTHIRST.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste: number) => 4.5 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.3,
        },
      },
      {
        spell: SPELLS.RAGING_BLOW.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste: number) => 8 / (1 + haste),
        charges: combatant.has2Piece() ? 3 : 2,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.RAMPAGE.id,
        category: SPELL_CATEGORY.ROTATIONAL, // Needs 85 rage, if using Frothing Berserker one should only Rampage whilst at 100 rage.
        gcd: {
          base: 1500,
        },
      },
      {
        spell: [SPELLS.EXECUTE_FURY.id, SPELLS.EXECUTE_FURY_MASSACRE.id],
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste: number) => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasCovenant(COVENANTS.VENTHYR.id),
      },
      {
        spell: [
          SPELLS.CONDEMN.id,
          SPELLS.CONDEMN_MASSACRE.id,
          SPELLS.CONDEMN_FURY.id,
          SPELLS.CONDEMN_FURY_MASSACRE.id,
        ],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasCovenant(COVENANTS.VENTHYR.id),
      },
      {
        spell: SPELLS.SIEGEBREAKER_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
        enabled: combatant.hasTalent(SPELLS.SIEGEBREAKER_TALENT.id),
      },
      // Rotational AOE
      {
        spell: SPELLS.WHIRLWIND_FURY_CAST.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.DRAGON_ROAR_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 35,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.DRAGON_ROAR_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
      },
      {
        spell: SPELLS.ANCIENT_AFTERSHOCK.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown:
          90 -
          (this.selectedCombatant.hasConduitBySpellID(SPELLS.DESTRUCTIVE_REVERBERATIONS.id)
            ? 15
            : 0),
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasCovenant(COVENANTS.NIGHT_FAE.id),
      },
      {
        spell: SPELLS.SPEAR_OF_BASTION.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasCovenant(COVENANTS.KYRIAN.id),
      },
      // Others
      {
        spell: SPELLS.VICTORY_RUSH.id,
        category: SPELL_CATEGORY.OTHERS,
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasTalent(SPELLS.IMPENDING_VICTORY_TALENT.id),
      },
      {
        spell: SPELLS.IMPENDING_VICTORY_TALENT.id,
        category: SPELL_CATEGORY.OTHERS,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.IMPENDING_VICTORY_TALENT.id),
      },
      // Cooldown
      {
        spell: SPELLS.RECKLESSNESS.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.BLADESTORM_TALENT.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.BLADESTORM_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
      },
      {
        spell: SPELLS.CONQUERORS_BANNER.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 180,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasCovenant(COVENANTS.NECROLORD.id),
      },
      // Defensive
      {
        spell: SPELLS.ENRAGED_REGENERATION.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        buffSpellId: SPELLS.ENRAGED_REGENERATION.id,
        cooldown: 120,
        gcd: null,
        castEfficiency: {
          suggestion: true,
          importance: ISSUE_IMPORTANCE.MINOR,
          extraSuggestion: 'Use it to reduce damage taken for a short period.',
        },
      },
      {
        spell: SPELLS.RALLYING_CRY.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        buffSpellId: SPELLS.RALLYING_CRY_BUFF.id,
        cooldown: 180,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6,
          importance: ISSUE_IMPORTANCE.MINOR,
          extraSuggestion:
            'Use it preemptively as a buffer against large AOE, or reactively if you notice your raid is getting dangerously low on health.',
        },
      },
      // Utility
      {
        spell: SPELLS.CHARGE.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 20 - (combatant.hasTalent(SPELLS.DOUBLE_TIME_TALENT.id) ? 3 : 0),
        charges: 1 + (combatant.hasTalent(SPELLS.DOUBLE_TIME_TALENT.id) ? 1 : 0),
      },
      {
        spell: SPELLS.HEROIC_LEAP.id,
        category: SPELL_CATEGORY.UTILITY,
        buffSpellId: SPELLS.BOUNDING_STRIDE_BUFF.id,
        cooldown: 45 - (combatant.hasTalent(SPELLS.BOUNDING_STRIDE_TALENT.id) ? 15 : 0),
        charges: 1,
        gcd: null,
      },
      {
        spell: SPELLS.STORM_BOLT_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.4,
          extraSuggestion:
            "If you're picking a utility talent over something that increases your mobility or survivability, you better use it.",
        },
        enabled: combatant.hasTalent(SPELLS.STORM_BOLT_TALENT.id),
      },
      {
        spell: SPELLS.PUMMEL.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 15,
        gcd: null,
      },
      {
        spell: SPELLS.BERSERKER_RAGE.id,
        category: SPELL_CATEGORY.UTILITY,
        buffSpellId: SPELLS.BERSERKER_RAGE.id,
        cooldown: 60,
        gcd: null,
      },
      {
        spell: SPELLS.HEROIC_THROW.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 6,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.INTIMIDATING_SHOUT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.PIERCING_HOWL.id,
        category: SPELL_CATEGORY.UTILITY,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.BATTLE_SHOUT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 15,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.TAUNT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 8,
        gcd: null,
      },
    ];
  }
}

export default Abilities;
